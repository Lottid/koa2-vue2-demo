<template>
    <div>
        <div style="margin-bottom: 20px">
            <h2>选择图片</h2>
            <label for="imgFileChange">添加图片</label>
            <input id='imgFileChange' type="file" @change="onFileChange" multiple style="display: none;">
        </div>
        <div v-if="images.length >0">
            <ul>
                <li v-for="(item,index) in images">
                    <img :src="item.base64" @click='delImage(index)' />
                    <a href="javascript:void(0);" style="position: absolute;" @click='delImage(index)'>
                        <span class="glyphicon glyphicon-remove"></span>
                    </a>
                </li>
            </ul>
            <button @click="removeImage">移除全部图片</button>
            <button @click='uploadImage'>上传</button>
        </div>
    </div>
</template>

<script>
import '../assets/css/bootstrap.css';
import api from '../api.js';
export default {
    name: 'upload-ajax',
    data() {
        return {
            images: []
        }
    },
    methods: {
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            //console.log(files)
            this.createImage(files);
        },
        createImage(file) {

            if (typeof FileReader === 'undefined') {
                alert('您的浏览器不支持图片上传，请升级您的浏览器');
                return false;
            }
            var image = new Image(),
            	that = this,
            	fileLists = file,
            	fileLen = fileLists.length;
            that.readFile(fileLists,0,fileLen);
        },
        readFile:function(fileList,index,limtLen) {
	    	var imgObj = {},
	    		that = this;
	    	if(index >= limtLen) return;
	    	imgObj.name = fileList[index].name;
	    	imgObj.size = fileList[index].size;
	    	imgObj.type = fileList[index].type;
	    	var reader = new FileReader();
	    	reader.readAsDataURL(fileList[index]);
	        reader.onload = function(e) {
            	imgObj.base64 = e.target.result;
                that.images.push(imgObj);
            };
            reader.onloadend = function() {
            	that.readFile(fileList,++index,limtLen);
            }
		},
        delImage: function(index) {
            this.images.shift(index);
        },
        removeImage: function(e) {
            this.images = [];
        },
        uploadImage: function() {
            var obj = {};
            obj.images = this.images;
            this.$http.post(api.upload, {
                images: obj.images
            }).then(response => {
                // get status
                //response.status;
                // get status text
                //response.statusText;
                // get 'Expires' header
                //response.headers.get('Expires');

                console.log(response.body);

            }, response => {
                // error callback
            });
        }
    }
}

</script>
<style>
ul {
    list-style: none outside none;
    margin: 0;
    padding: 0;
}

li {
    margin: 0 10px;
    display: inline;
}


img {
    width: 100px;
    height: 100px;
    margin: auto;
    display: inline;
    margin-bottom: 10px;
}
</style>
