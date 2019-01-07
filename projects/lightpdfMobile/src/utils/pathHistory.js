
const history = {
    arr: [],
    backRouter: ['/home', '/topdf', '/mergepdf', ],
    push(pathItem) {
        // pathItem
        // {
        //     path: '/home',
        //     query: queryObj,
        // }
        this.arr.push(pathItem);
    },
    search(path) {
        let pathItem;
        let item;
        if (!path) {
            return null;
        }
        if (this.arr.length <= 1) {
            return null;
        }

        for (let i = this.arr.length - 1; i >= 0; i -= 1) {
            item = this.arr[i];
            if (item && item.path === path) {
                pathItem = item;
                break;
            }
        }
        return pathItem;
    },
};

export default history;
