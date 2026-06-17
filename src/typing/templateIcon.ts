export type TemplateIconName =
  | 'upload'
  | 'document'
  | 'documentDashed'
  | 'x'
  | 'plus'
  | 'trash'
  | 'chevronDown'
  | 'chevronRight'
  | 'grip'
  | 'paragraph'
  | 'gridKV'
  | 'list'
  | 'photo'
  | 'checkCircle'
  | 'edit'

export type TemplateIconProps = {
  name: TemplateIconName
  className?: string
}

export type TemplateTypeMeta = {
  icon: TemplateIconName
  label: string
  description: string
}
