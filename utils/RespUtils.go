package utils

// 错误相应模型
type APIResp struct {
	Code string
	Msg  string
	Data interface{}
}

func PackageError(err error) APIResp {
	return APIResp{Code: "ERROR", Msg: err.Error()}
}

func PackageErrorMsg(err string) APIResp {
	return APIResp{Code: "ERROR", Msg: err}
}

func PackageData(data interface{}) APIResp {
	return APIResp{Code: "OK", Data: data}
}

func Success() APIResp {
	return APIResp{Code: "OK"}
}
