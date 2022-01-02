package com.taoes.simpledocker.controller;

import com.github.dockerjava.api.command.InspectVolumeResponse;
import com.github.dockerjava.api.command.ListVolumesResponse;
import com.taoes.simpledocker.controller.volume.CreateVolumeRequest;
import com.taoes.simpledocker.service.VolumeService;
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
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/4 11:35 下午
 */
@RestController
@RequestMapping("/api/volume")
public class VolumeController {

    @Autowired
    private VolumeService volumeService;

    @GetMapping
    public ListVolumesResponse list() {
        return volumeService.list();
    }

    @PostMapping
    public void create(@RequestBody CreateVolumeRequest request) {
        volumeService.create(request.getName(), request.getDriver());
    }

    @GetMapping("/{name}")
    public InspectVolumeResponse inspect(@PathVariable("name") String name) {
        return volumeService.inspect(name);
    }

    @DeleteMapping("/{name}")
    public void delete(@PathVariable("name") String name) {
        volumeService.remove(name);
    }

}
