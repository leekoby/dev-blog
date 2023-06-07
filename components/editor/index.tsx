import { useEffect, useState } from 'react';

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
import SeoForm from './SeoForm';

interface Props {}

/** 2023/06/05 - 에디터 - by leekoby */
const Editor: React.FC<Props> = (props): JSX.Element => {
  const [selectionRange, setSelectionRange] = useState<Range>();
  const [showGallery, setShowGallery] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<{ src: string }[]>([]);

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

  // 링크 범위 선택
  useEffect(() => {
    if (editor && selectionRange) editor.commands.setTextSelection(selectionRange);
  }, [editor, selectionRange]);

  // 이미지 fetching
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <div className='p-3 dark:bg-primary-dark bg-primary transition'>
        <div className='sticky top-0 z-10 dark:bg-primary-dark bg-primary'>
          {/* 제목 */}
          <input
            type='text'
            className='py-2 outline-none bg-transparent w-full border-0 border-b-[1px] border-secondary-dark dark:border-secondary-light text-3xl font-semibold italic text-primary-dark dark:text-primary mb-3'
            placeholder='제목'
          />

          {/* 툴바 */}
          <ToolBar editor={editor} onOpenImageClick={() => setShowGallery(true)} />

          <div className='h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3' />

          {editor && <EditLink editor={editor} />}

          <EditorContent editor={editor} className='min-h-[300px]' />

          <div className='h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3' />

          <SeoForm onChange={(result) => console.log(result)} />
        </div>

        <GalleryModal
          visible={showGallery}
          onClose={() => setShowGallery(false)}
          onSelect={handleImageSelection}
          images={images}
          onFileSelect={handleImageUpload}
          uploading={uploading}
        />
      </div>
    </>
  );
};

export default Editor;
