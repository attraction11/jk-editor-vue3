export interface TooltipOptions {
  name?: string
  color?: string
  background?: string
  borderRadius?: number
  fontWeight?: number
}

export const defaultTooltipOptions: TooltipOptions = {
  name: 'VueCustomTooltip',
  color: '#000',
  background: '#fff',
  borderRadius: 4,
  fontWeight: 400
}
