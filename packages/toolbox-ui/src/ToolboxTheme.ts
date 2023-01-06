import type { ColorScheme, MantineThemeOverride, Tuple } from '@mantine/core'

type ColorShade = Tuple<string, 8>

const animoColors = {
  neutral: ['#E6E6E6', '#CCCCCC', '#B3B3B3', '#999999', '#808080', '#666666', '#4D4D4D', '#333333'] as ColorShade,
  animoWhite: ['#666666', '#7D7D7D', '#939393', '#A8A8A8', '#BFBFBF', '#D3D3D3', '#E8E8E8', '#F5F5F4'] as ColorShade,
  animoCoral: ['#FFC6C6', '#FFFFFF', '#FFEAEA', '#FFD5D5', '#FFBFBF', '#FFA5A5', '#FF8989', '#EA6767'] as ColorShade,
  animoBlue: ['#EDF0F4', '#F8F9FA', '#F4F6F9', '#EBF1FF', '#C7D3E8', '#A3B6D3', '#7B9BC9', '#557EBA'] as ColorShade,
  animoGreen: ['#E0F6E0', '#F5FFF5', '#EAFEEA', '#DFFEDF', '#BFEABF', '#9FD19F', '#7FB77F', '#5E9E6E'] as ColorShade,
  animoYellow: ['#FEF8D5', '#FFFDF5', '#FEFCEA', '#FEF8D5', '#FDF1BF', '#FBE9A5', '#F7D97B', '#F2C94C'] as ColorShade,
  animoOrange: ['#FEF8D5', '#FFFDF5', '#FEFCEA', '#FEF5D5', '#FDEABF', '#FCD19F', '#F7B77B', '#F2994A'] as ColorShade,
  animoRed: ['#FFEAEA', '#FFF5F5', '#FFEAEA', '#FFD5D5', '#FFBFBF', '#FF9F9F', '#FF7B7B', '#EB5757'] as ColorShade,
  animoBlack: ['#A9A9A9', '#979797', '#858585', '#737373', '#616161', '#4F4F4F', '#3D3D3D', '#202223'] as ColorShade,
  animoLightgrey: [
    '#505050',
    '#666666',
    '#7D7D7D',
    '#939393',
    '#A8A8A8',
    '#BFBFBF',
    '#D3D3D3',
    '#E5E5E5',
  ] as ColorShade,
  animoDarkgrey: ['#898989', '#7A7A7A', '#6B6B6B', '#5C5C5C', '#4D4D4D', '#3D3D3D', '#2F2F2F', '#3A3B3B'] as ColorShade,
}

type AnimoVariantTheme = {
  primaryOne: ColorShade
  primaryTwo: ColorShade
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

const animoLightTheme: AnimoVariantTheme = {
  primaryOne: animoColors.animoBlack,
  primaryTwo: animoColors.animoBlack, // TODO: Add a second primary color
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

const animoDarkTheme: AnimoVariantTheme = {
  primaryOne: animoColors.animoWhite,
  primaryTwo: animoColors.animoWhite, // TODO: Add a second primary color
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

export const toolboxTheme = (colorScheme: ColorScheme): MantineThemeOverride => ({
  colorScheme: colorScheme,
  colors: colorScheme === 'dark' ? animoDarkTheme : animoLightTheme,

  defaultRadius: '0.25rem',

  white: '#F5F5F4',
  black: '#202223',

  primaryColor: 'primaryOne',

  fontFamily: 'Montserrat, sans-serif',

  components: {
    Title: {
      styles: (theme) => ({
        root: {
          color: theme.colors.textOne[7],
        },
      }),
    },
  },
})

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<keyof AnimoVariantTheme, Tuple<string, 10>>
  }
}
