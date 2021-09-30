const context = require.context("pages", true, /\.tsx$/);
let components : any[] = [];
context.keys().forEach((item: any, index: any) => {
    let path = item.split(".")[1].toLowerCase();
    console.log(path,'path');
    let compareArr = path.split("/");
    console.log(compareArr,'compareArr');  
    if (compareArr[1] === compareArr[2]) {
        path = "/" + compareArr[1];
    }
    path = "/main" + path;
    let component = context(item).default;
    components.push({ path, component });
});
export default components;
