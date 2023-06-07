import classnames from 'classnames';
import { ChangeEventHandler, useEffect, useState } from 'react';
import slugify from 'slugify';

export interface SeoResult {
  meta: string;
  slug: string;
  tags: string;
}

interface Props {
  initialValue?: SeoResult;
  title?: string;
  onChange(result: SeoResult): void;
}

/** 2023/06/07 - SEO FORM - by leekoby */
const commonInput =
  'w-full bg-transparent outline-none border-2 border-secondary-dark focus:border-primary-dark focus:dark:border-primary rounded transition p-2 text-primary-dark dark:text-primary';

const SeoForm: React.FC<Props> = ({ initialValue, title = '', onChange }): JSX.Element => {
  const [values, setValues] = useState({ meta: '', slug: '', tags: '' });

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    let { name, value } = target;
    if (name === 'meta') value = value.substring(0, 150);
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    onChange(newValues);
  };

  useEffect(() => {
    const slug = slugify(title, { lower: true, locale: 'ko', remove: /[*+~.()'"!:@&]/g });
    const newValues = { ...values, slug };
    setValues(newValues);
    onChange(newValues);
  }, [title]);

  useEffect(() => {
    if (initialValue) {
      setValues({
        ...initialValue,
        slug: slugify(initialValue.slug, { lower: true, locale: 'ko', remove: /[*+~.()'"!:@&]/g }),
      });
    }
  }, [initialValue]);

  const { meta, slug, tags } = values;

  return (
    <div className='space-y-4'>
      <h1 className='text-primary-dark dark:text-primary text-xl font-semibold'>SEO</h1>
      <Input
        value={slug}
        onChange={handleChange}
        name='slug'
        placeHolder='slug 입력'
        label='Slug:'
      />
      <Input
        value={tags}
        onChange={handleChange}
        name='tags'
        placeHolder='React, NextJs '
        label='Tags:'
      />

      <div className='relative'>
        <textarea
          name='meta'
          value={meta}
          onChange={handleChange}
          className={classnames(commonInput, 'text-lg h-20 resize-none')}
          placeholder='Meta 설명 150자'></textarea>
        <p className='absolute bottom-3 right-3 text-primary-dark dark:text-primary text-sm'>
          {meta.length}/150
        </p>
      </div>
    </div>
  );
};

const Input: React.FC<{
  name?: string;
  label?: string;
  value: string;
  placeHolder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}> = ({ name, label, value, placeHolder, onChange }) => {
  return (
    <label className='block relative'>
      <span className='absolute top-1/2 -translate-y-1/2 text-sm font-semibold text-primary-dark dark:text-primary pl-2'>
        {label}
      </span>
      <input
        type='text'
        name={name}
        value={value}
        placeholder={placeHolder}
        className={classnames(commonInput, ' italic pl-11')}
        onChange={onChange}
      />
    </label>
  );
};

export default SeoForm;
