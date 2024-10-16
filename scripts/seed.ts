const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient();

async function main() {
    try {
        await database.preference.createMany({
            data: [
                { name: "Default" },
                { name: "Professional" },
                { name: "Non-Professional" },
                { name: "Friendly" },
                { name: "Casual" },
            ]
        });
        console.log("[CREATE_PREFERENCES_SUCCESS]");
    } catch (error) {
        console.error("[CREATE_PREFERENCES_ERROR]", error);
    } finally {
        database.$disconnect();
    }
}

main();