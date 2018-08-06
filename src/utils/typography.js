import Typography from 'typography';
import theme from 'typography-theme-github';

theme.overrideThemeStyles = () => ({
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
});

delete theme.googleFonts;

const typography = new Typography(theme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
export const { rhythm, scale } = typography;
// export const scale = typography.scale;
