import { ChangeEventHandler, useEffect, useState } from 'react';

import { useEditor, EditorContent, getMarkRange, Range } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import PlaceHolder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import TipTapImage from '@tiptap/extension-image';

import ToolBar from './ToolBar';
import EditLink from './Link/EditLink';
import GalleryModal, { ImageSelectionResult } from './GalleryModal';
import axios from 'axios';
import SeoForm, { SeoResult } from './SeoForm';
import ActionButton from '../common/ActionButton';
import ThumbnailSelector from './ThumbnailSelector';

export interface FinalPost extends SeoResult {
  id?: string;
  title: string;
  content: string;
  thumbnail?: File | string;
}

interface Props {
  initialValue?: FinalPost;
  btnTitle?: string;
  busy?: boolean;
  onSubmit(post: FinalPost): void;
}

/** 2023/06/05 - 에디터 - by leekoby */
const Editor: React.FC<Props> = ({
  initialValue,
  btnTitle = 'Submit',
  busy = false,
  onSubmit,
}): JSX.Element => {
  const [selectionRange, setSelectionRange] = useState<Range>();
  const [showGallery, setShowGallery] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<{ src: string }[]>([]);
  const [seoInitialValue, setSeoInitialValue] = useState<SeoResult>();
  const [post, setPost] = useState<FinalPost>({
    title: '',
    content: '',
    meta: '',
    tags: '',
    slug: '',
  });

  //이미지 fetching
  const fetchImages = async () => {
    const { data } = await axios('/api/image');
    setImages(data.images);
  };
  //이미지 file upload
  const handleImageUpload = async (image: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('image', image);
    const { data } = await axios.post('/api/image', formData);
    setUploading(false);
    setImages([data, ...images]);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          target: '',
        },
      }),
      PlaceHolder.configure({
        placeholder: '내용 입력',
      }),
      Youtube.configure({
        width: 840,
        height: 472.5,
        HTMLAttributes: { class: 'mx-auto rounded' },
      }),
      TipTapImage.configure({
        HTMLAttributes: {
          class: 'mx-auto',
        },
      }),
    ],

    editorProps: {
      handleClick(view, position, event) {
        const { state } = view;
        const selectionRange = getMarkRange(state.doc.resolve(position), state.schema.marks.link);
        if (selectionRange) setSelectionRange(selectionRange);
      },

      attributes: {
        class: 'prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full',
      },
    },
  });

  const handleImageSelection = (result: ImageSelectionResult) => {
    editor?.chain().focus().setImage({ src: result.src, alt: result.altText }).run();
  };

  // 제출
  const handleSubmit = () => {
    if (!editor) return;
    onSubmit({ ...post, content: editor.getHTML() });
  };

  //제목
  const updateTitle: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setPost({ ...post, title: target.value });
  };

  // SEO
  const updateSeoValue = (result: SeoResult) => {
    setPost({ ...post, ...result });
  };

  //썸네일
  const updateThumbnail = (file: File) => {
    setPost({ ...post, thumbnail: file });
  };

  // 링크 범위 선택
  useEffect(() => {
    if (editor && selectionRange) editor.commands.setTextSelection(selectionRange);
  }, [editor, selectionRange]);

  // 이미지 fetching
  useEffect(() => {
    fetchImages();
  }, []);

  // initialValue
  useEffect(() => {
    if (initialValue) {
      setPost({ ...initialValue });
      editor?.commands.setContent(initialValue.content);

      const { meta, slug, tags } = initialValue;

      setSeoInitialValue({ meta, slug, tags });
    }
  }, [initialValue, editor]);

  return (
    <>
      <div className='p-3 dark:bg-primary-dark bg-primary transition'>
        <div className='sticky top-0 z-10 dark:bg-primary-dark bg-primary'>
          {/* 썸네일 선택 & 포스팅 버튼 */}
          <div className='flex items-center justify-between mb-3'>
            <ThumbnailSelector initialValue={post.thumbnail as string} onChange={updateThumbnail} />

            <div className='inline-block'>
              <ActionButton busy={busy} title={btnTitle} onClick={handleSubmit} />
            </div>
          </div>

          {/* 제목 */}

          <input
            type='text'
            className='py-2 outline-none bg-transparent w-full border-0 border-b-[1px] border-secondary-dark dark:border-secondary-light text-3xl font-semibold italic text-primary-dark dark:text-primary mb-3'
            placeholder='제목'
            onChange={updateTitle}
            value={post.title}
          />

          {/* 툴바 */}
          <ToolBar editor={editor} onOpenImageClick={() => setShowGallery(true)} />

          <div className='h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3' />
        </div>
        {editor && <EditLink editor={editor} />}

        <EditorContent editor={editor} className='min-h-[300px]' />

        <div className='h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3' />

        <SeoForm onChange={updateSeoValue} title={post.title} initialValue={seoInitialValue} />
      </div>

      <GalleryModal
        visible={showGallery}
        onClose={() => setShowGallery(false)}
        onSelect={handleImageSelection}
        images={images}
        onFileSelect={handleImageUpload}
        uploading={uploading}
      />
    </>
  );
};

export default Editor;
