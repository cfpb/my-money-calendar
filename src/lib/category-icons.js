import ReactDOMServer from 'react-dom/server'
// const requireCategoryIcons = require.context( '!svg-react-loader!../img/category-icons', true, /\.svg$/ );
const requireCategoryIcons = require.context( '../img/category-icons', true, /\.svg$/ );
const categoryIcons = requireCategoryIcons.keys().reduce( ( images, path ) => {
  const name = path.replace( /(\.\/|\.svg)/g, '' );
  const iconSvgObject = requireCategoryIcons( path );
  images[name] = iconSvgObject
  return images;
}, {} );

export default categoryIcons;
