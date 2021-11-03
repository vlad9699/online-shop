import * as uuid from 'uuid'
import * as path from 'path'


class FileService {
  async saveFile(file) {
    try {
      const fileName = uuid.v4() + '.jpg'
      const filePath = path.resolve('uploads', fileName)
      file.mv(filePath)
      return 'uploads/'+fileName
    } catch (e) {
      console.log(e)
    }
  }
}

export default new FileService()
