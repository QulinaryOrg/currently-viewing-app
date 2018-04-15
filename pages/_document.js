/* 
https://github.com/zeit/next-plugins/tree/master/packages/next-css

The stylesheet is compiled to .next/static/style.css. 
You have to include it into the page using a custom _document.js.
The file will be served from /_next/static/style.css
 */
import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
