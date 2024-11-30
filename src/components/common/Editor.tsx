import React, { useState } from 'react';

interface Props {
  content: string;
  onSave: (content: string) => void;
}

export default function Editor({ content: initialContent, onSave }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialContent);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave(content);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    <div className="w-full" onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <div className="py-4">
          <textarea
            className="w-full h-max"
            value={content}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>
          <button className="ml-4" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : (
        <h3
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
}
