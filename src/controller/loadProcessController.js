'use strict'
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class MainController{
    async executeLoadProcess(req, res){
        let params = req.body;
        let jsonOrigin = params.content;
        let jsonParams = JSON.stringify(jsonOrigin);

        try{
            if(params.workspace_Id == null){
                return res.status(200).send({message:'El workspace key no fue seteado'});
            }else {
                const informationWorkspace = await prisma.$queryRawUnsafe(`execute SP_Get_Workspace_All`);
                for (let i = 0; i < informationWorkspace.length; i++) {
                    if (informationWorkspace[i].WorkspaceKey == params.workspace_Id) {
                        await prisma.$queryRawUnsafe(`execute load_process_JSON_Optacheck '${jsonParams}','${params.workspace_Id}'`)
                        let get_params_header = await prisma.$queryRawUnsafe(`execute sp_execution_header_process '${params.workspace_Id}'`);
                        let arr =  get_params_header[0].Information.split(' ')
                        await prisma.$queryRawUnsafe(`execute ${informationWorkspace[i].UpdateSource} ${parseInt(arr[0])},${parseInt(arr[1])},${2}`);
                        return res.status(200).send({message:'SE TERMINO DE REALIZAR EL PROCESO'});
                    }
                }
                // if (request !== []) {
                //     return res.status(200).send({message:'Se grabo correctamente la data en la base de datos'});
                // } else {
                //     return res.status(404).send({ message: 'No se ha podido obtener alguna respuesta de la base de datos' })
                // }
            }
            
        } catch (error) {
            return res.status(500).send({ message: 'No se ha podido capturar la informacion requerida por el servidor || ' + error })
        }
    }
}

const getJSONController = new MainController();
module.exports = getJSONController;