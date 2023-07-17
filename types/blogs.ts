export interface Blog{
    id: number;
    title: string;
    description: string;
    blogtag: {
        id: number;
        name: string;
    };
    blogcategory: {
        id: number;
        name: string;
    }
    fileKey: URL;
    fileLocation: URL;
    createdAt: string;
    updatedAt: string;
}