import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { v4} from 'uuid';
// import * as uuid from "uuid"

@Injectable()
export class FileService {
    async saveFile(file: any) {
        try {
            const {v4} = await import("uuid")
            const fileName = v4() + '.jpg';
            const filePath = path.resolve(__dirname, '../..', 'static');

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }

            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName;

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("File yozishda xatolik");
        }
    }
}
