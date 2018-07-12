<template>
    <div style="padding: 20px;flex:1;">
        <el-card class="box-card-fenci">
            <div style="font-family: Helvetica Neue;text-align: left;font-size: 18px;">
                <p>分词对照表：</p>
                <el-upload
                    class="upload-demo"
                    ref="uploadjieba"
                    action="http://127.0.0.1:8000/upload/"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :headers="headers"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :auto-upload="false">
                    <el-button slot="trigger" size="big" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="big" type="success" @click="submitUploadDiv">上传到服务器</el-button>
                    <el-button style="margin-left: 15px;" size="big" type="warning" @click="submitDumpInDiv">导入数据</el-button>
                </el-upload>
            </div>
        </el-card>
        <p></p>
        <el-card class="box-card-eng">
            <div style="font-family: Helvetica Neue;text-align: left;font-size: 18px;padding: 20px;flex:1;">
                <p>英汉对照表：</p>
                <el-upload
                    class="upload-demo"
                    ref="uploadDict"
                    action="http://127.0.0.1:8000/upload/"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :headers="headers"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :auto-upload="false">
                    <el-button slot="trigger" size="big" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="big" type="success" @click="submitUploadDict">上传到服务器</el-button>
                    <el-button style="margin-left: 15px;" size="big" type="warning" @click="submitDumpInDict">导入数据</el-button>
                </el-upload>
            </div>
        </el-card>        

    </div>
</template>


<script>
import { requestDumpIn } from '@/api/api';

export default {
  data() {
    return {
      fileList: []
    };
  },
  computed: {
    headers() {
      return {
        Authorization: "JWT " + this.$store.getters.token
      };
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    submitUploadDiv() {
        this.$refs.uploadjieba.submit();
    },
    submitDumpInDiv() {
      this.$confirm('确认导入吗？','提交',{}).then(() => {
        const t1 = this.$refs.uploadjieba.uploadFiles[0]
        const para = {
          filename: t1.name,
          type: 'jieba'
          }
        requestDumpIn(para)
          .then((res) => {
            this.$message({
              message: '导入成功',
              type: 'success' 
            })
          })
          .catch(function (error) {console.log(error);})
          })
      .catch(function(error) { console.log(error) })
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    submitUploadDict() {
        this.$refs.uploadDict.submit();
    },
    submitDumpInDict() {
      this.$confirm('确认导入吗？','提交',{}).then(() => {
        const t1 = this.$refs.uploadDict.uploadFiles[0]
        const para = {
          filename: t1.name,
          type: 'griditems'
          }
        requestDumpIn(para)
          .then((res) => {
            console.log(res)
          })
          .catch(function (error) {console.log(error);})
          })
      .catch(function(error) { console.log(error) })
    },    
  }
};
</script>


<style>
/* .box-card-fenci {
    flex:1;
    padding: 20px;
} */
</style>
