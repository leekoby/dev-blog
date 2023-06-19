import Joi, { ObjectSchema } from 'joi';
import { isValidObjectId } from 'mongoose';

/** 2023/06/08 -  유효성 검사 커스텀 메세지 - by leekoby */
export const errorMessages = {
  INVALID_TITLE: '제목을 작성해주세요!',
  INVALID_TAGS: '태그는 문자열 배열입니다.',
  INVALID_SLUG: 'Slug가 없어요.',
  INVALID_META: 'Meta 설명을 잊으셨군요.',
  INVALID_CONTENT: '내용을 작성해주세요.',
};
/** 2023/06/08 - 스키마 유효성 검사 변수 - by leekoby */
export const postValidationSchema = Joi.object().keys({
  title: Joi.string().required().messages({
    'string.empty': errorMessages.INVALID_TITLE,
    'any.required': errorMessages.INVALID_TITLE,
  }),
  content: Joi.string().required().messages({
    'string.empty': errorMessages.INVALID_CONTENT,
    'any.required': errorMessages.INVALID_CONTENT,
  }),
  slug: Joi.string().required().messages({
    'string.empty': errorMessages.INVALID_SLUG,
    'any.required': errorMessages.INVALID_SLUG,
  }),
  meta: Joi.string().required().messages({
    'string.empty': errorMessages.INVALID_META,
    'any.required': errorMessages.INVALID_META,
  }),
  //문자열 배열
  tags: Joi.array().items(Joi.string()).messages({
    'string.base': errorMessages.INVALID_TAGS,
    'string.empty': errorMessages.INVALID_TAGS,
  }),
});

/** 2023/06/08 - 스키마 유효성 검사 - by leekoby */
export const validateSchema = (schema: ObjectSchema, value: any) => {
  const { error } = schema.validate(value, {
    errors: { label: 'key', wrap: { label: false, array: false } },
    allowUnknown: true, //thumbnail 허용
  });
  if (error) return error.details[0].message;
  return '';
};

/** 2023/06/11 - 댓글 스키마 유효성 검사 - by leekoby */
export const commentValidationSchema = Joi.object().keys({
  belongsTo: Joi.string()
    // .required()
    .custom((value, helper) => {
      if (!isValidObjectId(value)) return helper.error('any.invalid');
      return true;
    })
    .messages({
      'any.invalid': '게시물 ID는 소속으로 표시해야 합니다!',
      'string.empty': '유효하지 않은 소속',
    }),
  content: Joi.string().required().messages({
    'string.empty': '댓글의 내용이 누락되었습니다.',
  }),
});
