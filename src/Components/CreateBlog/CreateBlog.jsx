import React, { useState } from "react";
import "./CreateBlog.css";
import { Editor, EditorState, convertFromRaw, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import { Button, ButtonGroup } from "@material-ui/core";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import StrikethroughSIcon from "@material-ui/icons/StrikethroughS";

const CreateBlog = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <div className="createBlog">
      <section className="section__CreateBlog">
        <h3>Start Writing your blog</h3>
        <div className="Blog__content">
          <input type="text" placeholder="Title of your Blog" />
          <div className="Blog__main">
            <div className="Btn__Container">
              <ButtonGroup color="secondary" variant="text">
                <Button>
                  <FormatBoldIcon />
                </Button>
                <Button>
                  <FormatItalicIcon />
                </Button>
                <Button>
                  <StrikethroughSIcon />
                </Button>
              </ButtonGroup>
            </div>
            <Editor editorState={editorState} onChange={setEditorState} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateBlog;
