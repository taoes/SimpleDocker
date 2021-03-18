package routers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context/param"
)

func init() {

    beego.GlobalControllerRouter["SimpleDocker/src/api:ContainerController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:ContainerController"],
        beego.ControllerComments{
            Method: "Get",
            Router: "/api/container",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:ContainerController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:ContainerController"],
        beego.ControllerComments{
            Method: "StartContainer",
            Router: "/api/container/:containerId/:operator",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(
				param.New("containerId", param.InPath),
				param.New("operator", param.InPath),
			),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:ContainerController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:ContainerController"],
        beego.ControllerComments{
            Method: "RemoveContainer",
            Router: "/api/container/:containerId/delete",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(
				param.New("containerId", param.InPath),
			),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:ContainerController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:ContainerController"],
        beego.ControllerComments{
            Method: "ExportContainer",
            Router: "/api/container/:containerId/export",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(
				param.New("containerId", param.InPath),
			),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:ContainerController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:ContainerController"],
        beego.ControllerComments{
            Method: "GetContainerInfo",
            Router: "/api/container/:containerId/info",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(
				param.New("containerId", param.InPath),
			),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:ContainerController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:ContainerController"],
        beego.ControllerComments{
            Method: "GetContainerLog",
            Router: "/api/container/:containerId/log",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(
				param.New("containerId", param.InPath),
			),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:ContainerController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:ContainerController"],
        beego.ControllerComments{
            Method: "GetContainerAllLog",
            Router: "/api/container/:containerId/log/all",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(
				param.New("containerId", param.InPath),
			),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:ContainerController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:ContainerController"],
        beego.ControllerComments{
            Method: "Monitor",
            Router: "/api/container/:containerId/monitor/info",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(
				param.New("containerId", param.InPath),
			),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:ContainerController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:ContainerController"],
        beego.ControllerComments{
            Method: "RenameContainer",
            Router: "/api/container/:containerId/rename/:newName",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(
				param.New("containerId", param.InPath),
				param.New("newName", param.InPath),
			),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:ContainerController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:ContainerController"],
        beego.ControllerComments{
            Method: "CreateNewContainer",
            Router: "/api/container/run",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:DockerController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:DockerController"],
        beego.ControllerComments{
            Method: "DockerInfo",
            Router: "/api/docker/info",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:DockerController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:DockerController"],
        beego.ControllerComments{
            Method: "Ping",
            Router: "/api/docker/ping",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:DockerController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:DockerController"],
        beego.ControllerComments{
            Method: "GetVersion",
            Router: "/api/docker/version",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:FileController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:FileController"],
        beego.ControllerComments{
            Method: "FileInfo",
            Router: "/api/container/file",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:FileController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:FileController"],
        beego.ControllerComments{
            Method: "DownloadFromContainer",
            Router: "/api/container/fs",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:FileController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:FileController"],
        beego.ControllerComments{
            Method: "UploadFileToHost",
            Router: "/api/file/upload/:fileName",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(
				param.New("fileName", param.InPath),
			),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:FileController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:FileController"],
        beego.ControllerComments{
            Method: "CategoryInfo",
            Router: "/ws/api/container/:containerId/file",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(
				param.New("containerId", param.InPath),
			),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:ImageController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:ImageController"],
        beego.ControllerComments{
            Method: "GetImageList",
            Router: "/api/image",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:ImageController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:ImageController"],
        beego.ControllerComments{
            Method: "GetImageInfo",
            Router: "/api/image/:imageId",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(
				param.New("imageId", param.InPath),
			),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:ImageController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:ImageController"],
        beego.ControllerComments{
            Method: "DeleteImage",
            Router: "/api/image/:imageId/remove/:forge",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(
				param.New("imageId", param.InPath),
				param.New("forge", param.InPath),
			),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:ImageController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:ImageController"],
        beego.ControllerComments{
            Method: "ImportImage",
            Router: "/api/image/import",
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:ImageController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:ImageController"],
        beego.ControllerComments{
            Method: "PruneImage",
            Router: "/api/image/prune",
            AllowHTTPMethods: []string{"delete"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:ImageController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:ImageController"],
        beego.ControllerComments{
            Method: "PullImage",
            Router: "/api/image/pull",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:ImageController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:ImageController"],
        beego.ControllerComments{
            Method: "PushImage",
            Router: "/api/image/push",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:ImageController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:ImageController"],
        beego.ControllerComments{
            Method: "SaveImage",
            Router: "/api/image/save",
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:ImageController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:ImageController"],
        beego.ControllerComments{
            Method: "TagImage",
            Router: "/api/image/tag",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:LoginController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:LoginController"],
        beego.ControllerComments{
            Method: "Login",
            Router: "/api/docker/login",
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:LoginController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:LoginController"],
        beego.ControllerComments{
            Method: "SystemLogin",
            Router: "/api/system/login",
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:LoginController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:LoginController"],
        beego.ControllerComments{
            Method: "SystemLogout",
            Router: "/api/system/logout",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:LoginController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:LoginController"],
        beego.ControllerComments{
            Method: "UpdatePassword",
            Router: "/api/system/update/password",
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:NetworkController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:NetworkController"],
        beego.ControllerComments{
            Method: "GetNetworkList",
            Router: "/api/network",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:NetworkController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:NetworkController"],
        beego.ControllerComments{
            Method: "ConnectNetwork",
            Router: "/api/network/:networkId/container/:containerId/:operator",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(
				param.New("containerId", param.InPath),
				param.New("networkId", param.InPath),
				param.New("operator", param.InPath),
			),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:NetworkController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:NetworkController"],
        beego.ControllerComments{
            Method: "RemoveNetwork",
            Router: "/api/network/:networkId/delete",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(
				param.New("networkId", param.InPath),
			),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:NetworkController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:NetworkController"],
        beego.ControllerComments{
            Method: "GetNetworkInfo",
            Router: "/api/network/:networkId/info",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(
				param.New("networkId", param.InPath),
			),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:NetworkController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:NetworkController"],
        beego.ControllerComments{
            Method: "CreateNetworkList",
            Router: "/api/network/new",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:NetworkController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:NetworkController"],
        beego.ControllerComments{
            Method: "PruneNetwork",
            Router: "/api/network/prune",
            AllowHTTPMethods: []string{"delete"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:TerminalController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:TerminalController"],
        beego.ControllerComments{
            Method: "CreateContainerExec",
            Router: "/api/container/:containerId/command/exec",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(
				param.New("containerId", param.InPath),
			),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:TerminalController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:TerminalController"],
        beego.ControllerComments{
            Method: "ResizeContainerTerminal",
            Router: "/api/container/:containerId/exec/:execId/:w/:h/resize",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(
				param.New("containerId", param.InPath),
				param.New("execId", param.InPath),
				param.New("w", param.InPath),
				param.New("h", param.InPath),
			),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:TerminalController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:TerminalController"],
        beego.ControllerComments{
            Method: "ConnectContainer",
            Router: "/ws/api/container/terminal/:execId",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(
				param.New("execId", param.InPath),
			),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:VolumeController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:VolumeController"],
        beego.ControllerComments{
            Method: "GetVolumeList",
            Router: "/api/volume",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:VolumeController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:VolumeController"],
        beego.ControllerComments{
            Method: "RemoveVolume",
            Router: "/api/volume/:volumeId/delete/:force",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(
				param.New("volumeId", param.InPath),
				param.New("force", param.InPath),
			),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:VolumeController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:VolumeController"],
        beego.ControllerComments{
            Method: "GetVolumeInfo",
            Router: "/api/volume/:volumeId/info",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(
				param.New("volumeId", param.InPath),
			),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:VolumeController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:VolumeController"],
        beego.ControllerComments{
            Method: "NewVolume",
            Router: "/api/volume/new",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["SimpleDocker/src/api:VolumeController"] = append(beego.GlobalControllerRouter["SimpleDocker/src/api:VolumeController"],
        beego.ControllerComments{
            Method: "PruneVolume",
            Router: "/api/volume/prune",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

}
