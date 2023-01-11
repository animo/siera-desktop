import type { AnimoVariantTheme } from './AnimoVariantTheme'

import { animoColors } from './AnimoColorShades'

export const animoLightTheme: AnimoVariantTheme = {
  primaryOne: animoColors.animoBlack,
  primaryTwo: animoColors.animoCoral,
  primaryThree: animoColors.animoBlue,
  secondaryOne: animoColors.animoWhite,
  secondaryTwo: animoColors.animoWhite, // TODO: Add a second secondary color

  backgroundOne: animoColors.animoWhite,
  backgroundTwo: animoColors.animoWhite, // TODO: Add a second background color
  grayscaleOne: animoColors.animoLightgrey,
  grayscaleTwo: animoColors.animoDarkgrey,

  info: animoColors.animoBlue,
  success: animoColors.animoGreen,
  warning: animoColors.animoYellow,
  error: animoColors.animoCoral,
  danger: animoColors.animoRed,

  textOne: animoColors.animoBlack,
  textTwo: animoColors.animoWhite,
}
