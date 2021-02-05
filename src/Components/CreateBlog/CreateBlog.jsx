import React, { useState } from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import "./CreateBlog.css";
import { Button } from "@material-ui/core";
import { useStateValue } from "../../UserContext/Stateprovider";
import axios from "axios";

const CreateBlog = () => {
  const [{ userInfo }, dispatch] = useStateValue();
  const EditorplaceHolder =
    "# Hello\n## Use the top toolbar and create some Awesome Content";

  const [editorContent, setEditorContent] = useState(EditorplaceHolder);
  const [BlogTitle, setBlogTitle] = useState("");
  const [posted, setPosted] = useState(false);

  const postBlog = async () => {
    if (userInfo !== null) {
      var data = {
        title: BlogTitle,
        content: editorContent,
        author: userInfo.username,
      };

      const checkToken = localStorage.getItem("token");

      var config = {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      };

      await axios
        .post("http://localhost/api/blog", data, config)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      setBlogTitle("");
      setEditorContent(EditorplaceHolder);
    }
  };

  return (
    <div className="createBlog">
      <section className="section__CreateBlog">
        <h3>Start Writing your blog</h3>
        {posted ? (
          <h3>Your Blog is posted Successfully</h3>
        ) : (
          <div className="Blog__content">
            <input
              required
              autoCorrect="true"
              value={BlogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              type="text"
              placeholder="Title of your Blog"
            />
            <MDEditor
              height={600}
              className="Editor"
              preview="live"
              value={editorContent}
              onChange={setEditorContent}
              autoCorrect="true"
              inlist="true"
              commands={[
                commands.bold,
                commands.italic,
                commands.strikethrough,
                commands.hr,
                commands.group(
                  [
                    commands.title1,
                    commands.title2,
                    commands.title3,
                    commands.title4,
                    commands.title5,
                    commands.title6,
                  ],
                  {
                    name: "title",
                    groupName: "title",
                    buttonProps: { "aria-label": "Insert title" },
                  }
                ),
                commands.divider,
                commands.link,
                commands.quote,
                commands.code,
                commands.divider,
                commands.unorderedListCommand,
                commands.orderedListCommand,
                commands.divider,
                commands.codeEdit,
                commands.codeLive,
                commands.codePreview,
                commands.divider,
                commands.fullscreen,
              ]}
            />
            <Button
              disabled={
                BlogTitle === "" ||
                editorContent === "" ||
                editorContent === EditorplaceHolder
              }
              onClick={() => {
                postBlog();
              }}
              className="post__btn"
            >
              Post Blog
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default CreateBlog;
