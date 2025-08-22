-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogParagraph" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,

    CONSTRAINT "BlogParagraph_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BlogParagraph" ADD CONSTRAINT "BlogParagraph_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
