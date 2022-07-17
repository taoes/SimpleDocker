package com.taoes.simpledocker.controller;

import cn.dev33.satoken.annotation.SaCheckPermission;
import com.github.dockerjava.api.command.InspectVolumeResponse;
import com.github.dockerjava.api.command.ListVolumesResponse;
import com.taoes.simpledocker.controller.volume.CreateVolumeRequest;
import com.taoes.simpledocker.model.ResponseModel;
import com.taoes.simpledocker.model.Role;
import com.taoes.simpledocker.service.VolumeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * TODO: please input file info
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/4 11:35 下午
 */
@Api(tags = "Docker储存卷")
@RestController
@RequestMapping("/api/volume")
@RequiredArgsConstructor
public class VolumeController {

    private final VolumeService volumeService;

    @GetMapping
    @ApiOperation("储存卷列表")
    @SaCheckPermission(value = "volume:query",orRole = Role.ADMIN_ROLE_NAME)
    public ResponseModel<ListVolumesResponse> list() {
        return ResponseModel.ok(volumeService.list());
    }

    @PostMapping
    @ApiOperation("创建储存卷")
    @SaCheckPermission(value = "volume:create",orRole = Role.ADMIN_ROLE_NAME)
    public void create(@RequestBody CreateVolumeRequest request) {
        volumeService.create(request.getName(), request.getDriver());
    }

    @GetMapping("/{name}")
    @ApiOperation("储存卷详情")
    @SaCheckPermission(value = "volume:query",orRole = Role.ADMIN_ROLE_NAME)
    public InspectVolumeResponse inspect(@PathVariable("name") String name) {
        return volumeService.inspect(name);
    }

    @DeleteMapping("/{name}")
    @ApiOperation("储存卷移除")
    @SaCheckPermission(value = "volume:delete",orRole = Role.ADMIN_ROLE_NAME)
    public void delete(@PathVariable("name") String name) {
        volumeService.remove(name);
    }

}
