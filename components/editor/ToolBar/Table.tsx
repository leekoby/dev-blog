import { useState } from 'react';
import { BsTable, BsYoutube } from 'react-icons/bs';
import Button from '../ToolBar/Button';
import { Editor } from '@tiptap/react';
import {
  AiOutlineInsertRowAbove,
  AiOutlineInsertRowBelow,
  AiOutlineInsertRowLeft,
  AiOutlineInsertRowRight,
  AiOutlineMergeCells,
  AiOutlineSplitCells,
} from 'react-icons/ai';

import { FcDeleteColumn, FcDeleteDatabase, FcDeleteRow } from 'react-icons/fc';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { MdOutlineAutoFixHigh } from 'react-icons/md';

interface Props {
  editor: Editor | null;
}

const commonClasses =
  'p-2 border-2 border-primary-dark rounded text-lg hover:scale-110 hover:shadow-md hover:bg-secondary-dark hover:text-primary transition bg-primary dark:hover:text-primary-dark dark:active:bg-primary dark:active:text-primary-dark active:bg-primary-dark active:text-primary';

/** 2023/06/27 - Table 버튼 - by leekoby */
const Table: React.FC<Props> = ({ editor }): JSX.Element | null => {
  const [visible, setVisible] = useState(false);
  const hideForm = () => setVisible(false);
  const showForm = () => setVisible(true);
  if (!editor) return null;
  return (
    <div
      onKeyDown={({ key }) => {
        if (key === 'Escape') hideForm();
      }}
      className='relative'>
      <Button onClick={visible ? hideForm : showForm}>
        <BsTable />
      </Button>
      {visible && (
        <div className='absolute top-full mt-4 right-0 z-50 bg-secondary-dark '>
          <div className='w-max'>
            <div className=''>
              <button
                className={commonClasses}
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                    .run()
                }>
                <BsTable size={20} />
              </button>
              <button
                className={commonClasses}
                onClick={() => editor.chain().focus().addColumnBefore().run()}>
                <AiOutlineInsertRowLeft size={20} />
              </button>
              <button
                className={commonClasses}
                onClick={() => editor.chain().focus().addColumnAfter().run()}>
                <AiOutlineInsertRowRight size={20} />
              </button>

              <button
                className={commonClasses}
                onClick={() => editor.chain().focus().addRowBefore().run()}>
                <AiOutlineInsertRowAbove size={20} />
              </button>
              <button
                className={commonClasses}
                onClick={() => editor.chain().focus().addRowAfter().run()}>
                <AiOutlineInsertRowBelow size={20} />
              </button>
              <button
                className={commonClasses}
                onClick={() => editor.chain().focus().deleteColumn().run()}>
                <FcDeleteColumn size={20} />
              </button>
              <button
                className={commonClasses}
                onClick={() => editor.chain().focus().deleteRow().run()}>
                <FcDeleteRow size={20} />
              </button>
              <button
                className={commonClasses}
                onClick={() => editor.chain().focus().deleteTable().run()}>
                <FcDeleteDatabase size={20} />
              </button>
              <button
                className={commonClasses}
                onClick={() => editor.chain().focus().mergeCells().run()}>
                <AiOutlineMergeCells size={20} />
              </button>

              <button
                className={commonClasses}
                onClick={() => editor.chain().focus().splitCell().run()}>
                <AiOutlineSplitCells />
              </button>
            </div>
            <div>
              <button
                className={commonClasses}
                onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>
                HC
              </button>
              <button
                className={commonClasses}
                onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
                HR
              </button>
              <button
                className={commonClasses}
                onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
                HC
              </button>
              <button
                className={commonClasses}
                onClick={() => editor.chain().focus().mergeOrSplit().run()}>
                MS
              </button>
              <button
                className={commonClasses}
                onClick={() => editor.chain().focus().setCellAttribute('colspan', 2).run()}>
                ATT
              </button>
              <button
                className={commonClasses}
                onClick={() => editor.chain().focus().fixTables().run()}>
                <MdOutlineAutoFixHigh size={20} />
              </button>
              <button
                className={commonClasses}
                onClick={() => editor.chain().focus().goToPreviousCell().run()}>
                <GrPrevious size={20} />
              </button>
              <button
                className={commonClasses}
                onClick={() => editor.chain().focus().goToNextCell().run()}>
                <GrNext size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
