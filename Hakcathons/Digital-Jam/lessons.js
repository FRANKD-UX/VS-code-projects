// lessons.js - Contains all the HTML lesson data
const lessons = [
  {
    id: 1,
    title: "HTML Document Structure",
    explanation: "HTML (HyperText Markup Language) is the standard markup language for creating web pages. Every HTML document has a basic structure with the DOCTYPE declaration, html, head, and body elements.",
    instructions: "Create a basic HTML document with a DOCTYPE declaration, html, head, and body elements. Inside the head, add a title element with 'My First Webpage' as its content.",
    initialCode: "<!-- Write your HTML code below -->\n\n\n",
    expectedOutput: function(code) {
      return code.includes('<!DOCTYPE html>') && 
             code.includes('<html>') && 
             code.includes('</html>') && 
             code.includes('<head>') && 
             code.includes('</head>') && 
             code.includes('<body>') && 
             code.includes('</body>') && 
             code.includes('<title>') && 
             code.includes('My First Webpage') && 
             code.includes('</title>');
    },
    hints: [
      "Start with <!DOCTYPE html> to declare the document type",
      "Add opening and closing <html> tags that contain the entire document",
      "Within the html tags, add <head> and <body> sections",
      "Inside the head section, add <title>My First Webpage</title>"
    ],
    validationRules: [
      {
        pattern: /<!DOCTYPE html>/i,
        message: "Make sure to include the DOCTYPE declaration"
      },
      {
        pattern: /<html>[\s\S]*<\/html>/i,
        message: "Your document should include opening and closing html tags"
      },
      {
        pattern: /<head>[\s\S]*<\/head>/i,
        message: "Your document should include a head section"
      },
      {
        pattern: /<title>[\s\S]*My First Webpage[\s\S]*<\/title>/i,
        message: "Include a title element with 'My First Webpage' as content"
      },
      {
        pattern: /<body>[\s\S]*<\/body>/i,
        message: "Your document should include a body section"
      }
    ],
    // audioFile: "audio/lesson1.mp3" // Commented out for now
  },
  {
    id: 2,
    title: "Headings and Paragraphs",
    explanation: "HTML uses heading elements (h1 to h6) to define headings, with h1 being the most important. Paragraph elements (p) are used for blocks of text.",
    instructions: "Create a webpage with an h1 heading 'About Me', an h2 heading 'My Hobbies', and at least two paragraphs of text under each heading.",
    initialCode: "<!DOCTYPE html>\n<html>\n<head>\n  <title>About Me Page</title>\n</head>\n<body>\n  <!-- Add your headings and paragraphs here -->\n  \n  \n</body>\n</html>",
    expectedOutput: function(code) {
      return code.includes('<h1>') && 
             code.includes('</h1>') && 
             code.includes('<h2>') && 
             code.includes('</h2>') && 
             code.includes('<p>') && 
             (code.match(/<p>/g) || []).length >= 2 && 
             code.includes('</p>');
    },
    hints: [
      "Use <h1>About Me</h1> for the main heading",
      "Use <h2>My Hobbies</h2> for the subheading",
      "Add paragraphs using the <p> tag: <p>Your text here</p>"
    ],
    validationRules: [
      {
        pattern: /<h1>[\s\S]*About Me[\s\S]*<\/h1>/i,
        message: "Include an h1 heading with 'About Me' as content"
      },
      {
        pattern: /<h2>[\s\S]*My Hobbies[\s\S]*<\/h2>/i,
        message: "Include an h2 heading with 'My Hobbies' as content"
      },
      {
        pattern: /<p>[\s\S]*<\/p>[\s\S]*<p>[\s\S]*<\/p>/i,
        message: "Include at least two paragraph elements"
      }
    ],
    // audioFile: "audio/lesson2.mp3" // Commented out for now
  },
  {
    id: 3,
    title: "Links and Images",
    explanation: "HTML uses anchor elements (a) to create hyperlinks to other pages or resources. The img element is used to embed images in a webpage.",
    instructions: "Create a webpage with a heading, an image, and a link. The image should have alt text, and the link should open in a new tab.",
    initialCode: "<!DOCTYPE html>\n<html>\n<head>\n  <title>Links and Images</title>\n</head>\n<body>\n  <!-- Add your heading, image, and link here -->\n  \n  \n</body>\n</html>",
    expectedOutput: function(code) {
      return code.includes('<h1>') && 
             code.includes('<img') && 
             code.includes('alt=') && 
             code.includes('<a') && 
             code.includes('href=') && 
             code.includes('target="_blank"');
    },
    hints: [
      "Use <h1>My Favorite Website</h1> for the heading",
      "Add an image with <img src=\"image.jpg\" alt=\"Description of image\">",
      "Create a link with <a href=\"https://example.com\" target=\"_blank\">Visit Example</a>"
    ],
    validationRules: [
      {
        pattern: /<h1>[\s\S]*<\/h1>/i,
        message: "Include an h1 heading"
      },
      {
        pattern: /<img[^>]+src=["'][^"']+["'][^>]*>/i,
        message: "Include an image with a src attribute"
      },
      {
        pattern: /<img[^>]+alt=["'][^"']*["'][^>]*>/i,
        message: "Your image should have an alt attribute"
      },
      {
        pattern: /<a[^>]+href=["'][^"']+["'][^>]*>/i,
        message: "Include a link with an href attribute"
      },
      {
        pattern: /<a[^>]+target=["']_blank["'][^>]*>/i,
        message: "Your link should have target=\"_blank\" to open in a new tab"
      }
    ],
    // audioFile: "audio/lesson3.mp3" // Commented out for now
  }
];