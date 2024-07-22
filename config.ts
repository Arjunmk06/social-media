require("dotenv").config();

export class Configurations{
    public static config = {
        mongoose : process.env.mongoose
    }
}

