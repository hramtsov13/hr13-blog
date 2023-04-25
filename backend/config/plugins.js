module.exports = ({ env }) => {
  return {
    email: {
      config: {
        provider: "sendgrid",
        providerOptions: {
          apiKey: env("SENDGRID_API_KEY"),
        },
        settings: {
          defaultFrom: "support@blog.hr13.ru",
          defaultReplyTo: "support@blog.hr13.ru",
          testAddress: "misha1301e@mail.ru",
        },
      },
    },
    ckeditor: {
      enabled: true,
      config: {
        plugin: {},
        editor: {
          toolbar: {
            items: [
              "heading1",
              "paragraph",
              "italic",
              "underline",
              "bulletedList",
              "numberedList",
              "horizontalLine",
              "StrapiMediaLib",
              "insertTable",
              "link",
              "htmlEmbed",
              "subscript",
              "superscript",
              "strikethrough",
              "code",
              "codeBlock",
              "highlight",
            ],
          },
          image: {
            resizeUnit: "%",
            resizeOptions: [
              {
                name: "resizeImage:original",
                value: null,
                icon: "original",
              },
              {
                name: "resizeImage:25",
                value: "25",
                icon: "small",
              },
              {
                name: "resizeImage:50",
                value: "50",
                icon: "medium",
              },
              {
                name: "resizeImage:75",
                value: "75",
                icon: "large",
              },
            ],
            toolbar: [
              "toggleImageCaption",
              "imageTextAlternative",
              "imageStyle:inline",
              "imageStyle:block",
              "imageStyle:side",
              "linkImage",
              "resizeImage:25",
              "resizeImage:50",
              "resizeImage:75",
              "resizeImage:original",
            ],
          },
          // https://ckeditor.com/docs/ckeditor5/latest/features/table.html
          table: {
            contentToolbar: [
              "tableColumn",
              "tableRow",
              "mergeTableCells",
              "tableCellProperties",
              "tableProperties",
              "toggleTableCaption",
            ],
          },
          // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html
          heading: {
            options: [
              {
                model: "paragraph",
                title: "Paragraph",
                class: "ck-heading_paragraph",
              },
              {
                model: "heading1",
                view: "h1",
                title: "Heading 1",
                class: "ck-heading_heading1",
              },
              {
                model: "heading2",
                view: "h2",
                title: "Heading 2",
                class: "ck-heading_heading2",
              },
              {
                model: "heading3",
                view: "h3",
                title: "Heading 3",
                class: "ck-heading_heading3",
              },
              {
                model: "heading4",
                view: "h4",
                title: "Heading 4",
                class: "ck-heading_heading4",
              },
            ],
          },
          // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html
          // Regular expressions (/.*/  /^(p|h[2-4])$/' etc) for htmlSupport does not allowed in this config
          htmlSupport: {
            allow: [
              {
                name: "img",
                attributes: {
                  sizes: true,
                  loading: true,
                },
              },
            ],
          },
        },
      },
    },
  };
};
