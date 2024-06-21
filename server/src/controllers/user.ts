import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import db from "../db";
import bcrypt from "bcrypt";
import { UserTable } from "../db/schema";
import { eq } from "drizzle-orm";


/* GET INITIALS */
const initials = (str1: string, str2: string) => {
    if (!str1 || !str2) {
      return "";
    }
    return str1[0].toUpperCase() + str2[0].toUpperCase();
 }


/* GET ALL USERS */
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await db.select().from(UserTable);
        res.json(users);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

/* CREATE USER */
export const createUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await db.insert(UserTable).values({
            firstName: firstName,
            lastName: lastName,
            email: email,
            initials: initials(firstName, lastName),
            password: hashedPassword
        })
        .returning();

        const token = jwt.sign(
            {
                userId: newUser[0].userId,
                firstName: newUser[0].firstName,
                lastName: newUser[0].lastName,
                email: newUser[0].email,
                domain: newUser[0].domain,
                description: newUser[0].description,
                avatar: newUser[0].avatar,
                initials: newUser[0].initials
            },
            process.env.JWT_SECRET!
        );

        res.status(201).json({ message: `Successfully signed in as ${newUser[0].firstName} ${newUser[0].lastName}`, token });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

/* LOGIN USER */
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { value, password } = req.body;

        const user = await db.query.UserTable.findFirst({
            where: eq(UserTable.email, value),
        });
        
        if (!user) {
            return res.status(404).json({ message: 'Invalid User!' });
        };

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials!' });
        };

        const token = jwt.sign(
            {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                domain: user.domain,
                description: user.description,
                avatar: user.avatar,
                initials: user.initials
            },
            process.env.JWT_SECRET!
        );

        res.status(200).json({ message: `Successfully signed in as ${user.firstName} ${user.lastName}`, token });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

// UPDATE USER DATA
export const updateUserdata = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { firstName, lastName, domain, description } = req.body;

        const user = await db.update(UserTable)
            .set({
                firstName: firstName,
                lastName: lastName,
                domain: domain,
                description: description
            })
            .where(eq(UserTable.userId, userId))
            .returning({
                userId: UserTable.userId,
                firstName: UserTable.firstName,
                lastName: UserTable.lastName,
                email: UserTable.email,
                domain: UserTable.domain,
                description: UserTable.description,
                avatar: UserTable.avatar,
            })
        
        res.status(200).json({ ...user[0], initials: initials(user[0].firstName, user[0].lastName) });
    } catch (err) {
        res.status(500).json(err);
    }
};