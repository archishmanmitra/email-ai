
import { db } from "./server/db";

await db.user.create({
    data:{
        emailAddress:'test@gmail.com',
        firstName: 'Hori',
        lastName: 'Poddar'
    }
});

console.log('done');