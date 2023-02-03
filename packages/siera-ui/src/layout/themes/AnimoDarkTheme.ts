import type { AnimoVariantTheme } from './AnimoVariantTheme'

import { animoColors } from './AnimoColorShades'

export const animoDarkTheme: AnimoVariantTheme = {
  primaryOne: animoColors.animoWhite,
  primaryTwo: animoColors.animoBlue,
  primaryThree: animoColors.animoBlue,
  secondaryOne: animoColors.animoBlack,
  secondaryTwo: animoColors.animoBlack, // TODO: Add a second secondary color

  backgroundOne: animoColors.animoBlack,
  backgroundTwo: animoColors.animoBlack, // TODO: Add a second background color

  grayscaleOne: animoColors.animoLightgrey,
  grayscaleTwo: animoColors.animoDarkgrey,

  info: animoColors.animoBlue,
  success: animoColors.animoGreen,
  warning: animoColors.animoYellow,
  error: animoColors.animoCoral,
  danger: animoColors.animoRed,

  textOne: animoColors.animoWhite,
  textTwo: animoColors.animoBlack,
}
