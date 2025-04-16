import { PrismaClient } from "@prisma/client"
import { ArchiveDocProps } from "../schema_types";

const prisma = new PrismaClient();

export async function archiveDoc({ id, userId, isArchived }: ArchiveDocProps) {
    try {
        const archived = await prisma.document.update({
            where: {
                id: id,
                userId: userId
            },
            data: {
                isArchived: !isArchived,
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

    const updateChildrens = await Promise.all(
        childs.map((child) =>
            prisma.document.update({
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