import Api from "./Api.js";
import Page from "./Page.js";

export default {
  get(page, filename) {
    return Api.get(this.url(page, filename)).then(file => {
      if (Array.isArray(file.content) === true) {
        file.content = {};
      }

      return file;
    });
  },
  update(page, filename, data) {
    return Api.post(this.url(page, filename), data);
  },
  rename(page, filename, to) {
    return Api.post(this.url(page, filename, "rename"), {
      name: to
    });
  },
  url(page, filename, path) {
    let url = Page.url(page, "files/" + filename);

    if (path) {
      url += "/" + path;
    }

    return url;
  },
  link(page, filename, path) {
    return "/" + this.url(page, filename, path);
  },
  delete(page, filename) {
    return Api.delete(this.url(page, filename));
  },
  options(page, filename) {
    return Api.get(this.url(page, filename, "options")).then(options => {
      let result = [];

      if (options.update) {
        result.push({
          icon: "edit",
          text: "Edit",
          click: "edit"
        });
      }

      result.push({
        icon: "download",
        text: "Download",
        click: "download"
      });

      result.push({
        icon: "upload",
        text: "Replace",
        click: "replace"
      });

      if (options.delete) {
        result.push({
          icon: "trash",
          text: "Delete",
          click: "remove"
        });
      }

      return result;
    });
  },
  preview(file) {
    if (file.type === "image") {
      return {
        image: file.url + "?v=" + file.modified
      };
    }

    let preview = {
      icon: "file",
      color: "#81a2be"
    };

    switch (file.mime) {
      case "application/zip":
        preview.icon = "file-zip";
        break;
    }

    preview.color = this.color(file);

    switch (file.extension) {
      case "indd":
        preview.color = "#cc6666";
        break;
      case "pdf":
        preview.icon = "file-pdf";
        break;
      case "css":
      case "js":
      case "pdf":
      case "xml":
        preview.icon = "file-code";
        break;
      case "xls":
      case "xlsx":
      case "csv":
        preview.icon = "file-checklist";
        preview.color = "#b5bd68";
        break;
      case "mdown":
      case "md":
        preview.icon = "markdown";
        break;
      case "mov":
      case "m4v":
        preview.icon = "video";
        break;
    }

    return preview;
  },
  color(file) {
    switch (file.type) {
      case "image":
        return "#454953";
      case "video":
        return "#f0c674";
      case "document":
        return "#cc6666";
      case "audio":
        return "#8abeb7";
      case "code":
        return "#b294bb";
      default:
        return "#81a2be";
    }
  },
  breadcrumb(file) {
    return Api.page.get(file.parent).then(page => {
      let breadcrumb = Api.page.breadcrumb(page);

      breadcrumb.push({
        label: file.filename,
        link: "/pages/" + page.id + "/files/" + file.filename
      });

      return breadcrumb;
    });
  }
};
