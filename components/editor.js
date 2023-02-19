import JoditEditor from 'jodit-react';
import React from 'react';

import { useRef } from 'react';
import { useState } from 'react';

export default function editor({post_body,setbody}) {
    const editor = useRef(null);
	const [content, setContent] = useState(post_body);
  return (
    <JoditEditor
			ref={editor}
			value={content}
			onChange={newContent => {setContent(newContent),setbody(newContent)}}
		/>
  )
}
