import { ArchiveDocProps } from "@/lib/schema_types";
import prisma from "@/prisma";

export async function archiveDoc({ id, userId, isArchived }: ArchiveDocProps) {
    // console.log(id);
    try {
        const archived = await prisma.document.update({
            where: {
                id: id,
                userId: userId
            },
            data: {
                isArchived: true,
            }
        })
        await archiveChildrens({ id: archived.id, userId: userId, isArchived });

        return archived;
    } catch (error) {
        return new Error("error while archiving doc :" + error);
    }
}

async function archiveChildrens({ id, userId }: ArchiveDocProps) {
    const childs = await prisma.document.findMany({
        where: {
            parentId: id,
            userId: userId
        }
    })

    if (childs) {
        const updateChildrens = await Promise.all(
            childs.map(async (child) =>
                await prisma.document.update({
                    where: { id: child.id },
                    data: { isArchived: true }
                })
            )
        );
        updateChildrens.map(async (child) => {
            await archiveChildrens({ id: child.id, userId: child.userId, isArchived: child.isArchived });
        })
        return childs;
    }
}