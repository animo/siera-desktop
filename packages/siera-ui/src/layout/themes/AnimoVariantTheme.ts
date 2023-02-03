import type { Tuple } from '@mantine/core'

export type ColorShade = Tuple<string, 8>

export type AnimoVariantTheme = {
  primaryOne: ColorShade
  primaryTwo: ColorShade
  primaryThree: ColorShade
  secondaryOne: ColorShade
  secondaryTwo: ColorShade
  backgroundOne: ColorShade
  backgroundTwo: ColorShade
  grayscaleOne: ColorShade
  grayscaleTwo: ColorShade
  info: ColorShade
  success: ColorShade
  warning: ColorShade
  error: ColorShade
  danger: ColorShade
  textOne: ColorShade
  textTwo: ColorShade
}
