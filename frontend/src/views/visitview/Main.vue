<template>
<div>
   <el-col :span="24" class="mainSQ">
       <el-col :span="12" class="mainInput">
            <el-row style="height: 50px;">
                <el-input placeholder="请输入内容" v-model="searchQuery">
                <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-row>
       </el-col>
       <el-col :span="12" class="">
           <el-row style="height: 50px;">
            <el-input placeholder="请输入内容" v-model="resultQuery">
            <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </el-row>
       </el-col>

        <div style="text-align:left" >
        <el-col :span="24" class="ItemCh" >
            <el-table :data="griditems" highlight-current-row>
                <el-col :span="12">
                <el-table-column prop="item_eng" label="英文翻译" ></el-table-column>
                </el-col>
                <el-col :span="12" class="ItemEng">
                <el-table-column prop="item_ch" label="中文"></el-table-column>
                </el-col>
            </el-table>
        </el-col>
        </div>
   </el-col>
</div>
</template>


<script>
import { requestItems,requestWords } from '@/api/api';

export default {
    data () {
        return {
            searchQuery:'',
            griditems:[],
            resultQuery:'',
        }
    },
    watch:{
      searchQuery: function (newV,oldV) {
        if (newV != ''){
          var sparams = { 
              params:{
                search:newV
            }
            }
          var dparams = {
            params:{
                word:newV
            }
          }
          var that = this
          requestItems(sparams)
          .then((res) => {that.griditems=res;})
          .catch(function (error) {console.log(error);})

          requestWords(dparams)
          .then((res) => {this.resultQuery=res})
          .catch(function (error) {console.log(error);})

          sparams = null
          dparams = null
        }
        else {
          this.resultQuery=''
          this.griditems=[]
        }
      }
    },
    methods:{

    },
}
</script>

<style>
.mainSQ{
    flex:1;
    padding: 20px;
}

</style>