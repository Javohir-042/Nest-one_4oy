import { INestApplication, ValidationPipe } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import request from "supertest";

describe("User (e2e)", () => {
    let app: INestApplication;
    let token: String;

    jest.setTimeout(15000);
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        // app.setGlobalPrefix("api");
        app.useGlobalPipes(new ValidationPipe());
        await app.init();

        const response = await request(app.getHttpServer())
            .post("/auth/signin")
            .send({
                email: "Agzam13@mail.uz",
                password: "Agzam12345!",
            });
        token = response.body.token;
        console.log("token", token);
    });
    it("/users (GET) --> 200 OK", () => {
        return request(app.getHttpServer())
            .get("/users")
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200);
    });

    it("/users (GET) --> 401 'Unauthorized'error", () => {
        return request(app.getHttpServer())
            .get("/users")
            // .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(401);
    });


    // it("/auth/signup (POST) --> 201", async () => {
    //     return request(app.getHttpServer())
    //         .post("/auth/signup")
    //         .send({
    //             name: "user2212",
    //             email: "user221222@mail.uz",
    //             password: "Uzbek1#t0n",
    //             value: "superadmin",
    //         })
    //         .expect("Content-Type", /json/)
    //         .expect(201); 
    // });

    it("/auth/signup (POST) --> 409", async () => {
        return request(app.getHttpServer())
            .post("/auth/signup")
            .send({
                name: "user2212",
                email: "user221222@mail.uz",
                password: "Uzbek1#t0n",
                value: "superadmin",
            })
            .expect("Content-Type", /json/)
            .expect(409)
            .expect({
                message: "Bunday foydalanuvchi mavjud",
                error: "Conflict",
                statusCode: 409,
            });
    });

    // it("/auth/signup (POST) --> 400 on Validation error",  () => {
    //     return request(app.getHttpServer())
    //         .post("/auth/signup")
    //         .send({
    //             name: "user2",
    //             email: "user221222@mail.uz",
    //             password: "Uzbek1#t0n",
    //             value: "superadmin",
    //         })
    //         .expect("Content-Type", /json/)
    //         .expect(400)
    //         .expect({
    //             statusCode: 400,
    //             message: ["Parol yetarlicha mustahkam emas"],
    //             error: "Bad Request"
    //         });
    // });



    afterAll(async () => {
        await app.close();
    });
});