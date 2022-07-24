package com.taoes.simpledocker.controller;

import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.StrUtil;
import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.InspectImageResponse;
import com.github.dockerjava.api.model.Image;
import com.taoes.simpledocker.config.DockerClientFactory;
import com.taoes.simpledocker.controller.image.ImageTagUpdateRequest;
import com.taoes.simpledocker.controller.image.PushImageRequest;
import com.taoes.simpledocker.model.ResponseModel;
import com.taoes.simpledocker.model.Role;
import com.taoes.simpledocker.service.ImageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * TODO: please input file info
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/4 11:35 下午
 */
@Api(tags = "Docker镜像管理")
@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {

  private final DockerClientFactory clientFactory;

  private final ImageService imageService;

  @ApiOperation("查看镜像列表")
  @SaCheckPermission(value = "image:query",orRole = Role.ADMIN_ROLE_NAME)
  @GetMapping("/list")
  public ResponseModel<List<Image>> list(@RequestParam(required = false) String searchKey) {
    final DockerClient dockerClient = clientFactory.get();
    final List<Image> images = dockerClient.listImagesCmd().withShowAll(true).exec();
    if (StrUtil.isBlank(searchKey)) {
      return ResponseModel.ok(images);
    }

    final List<Image> result = new ArrayList<>();
    for (Image image : images) {
      final String[] tags = image.getRepoTags();
      if (tags == null || tags.length == 0) {
        continue;
      }
      for (String tag : tags) {
        if (tag != null && tag.contains(searchKey)) {
          result.add(image);
        }
      }
    }

    return ResponseModel.ok(result);
  }

  @ApiOperation("查看镜像详情")
  @SaCheckPermission(value = "image:query",orRole = Role.ADMIN_ROLE_NAME)
  @GetMapping("/{imageId}/inspect")
  public InspectImageResponse findById(@PathVariable String imageId) {
    return imageService.inspect(imageId);
  }

  @ApiOperation("拉取镜像")
  @SaCheckPermission(value = "image:pull",orRole = Role.ADMIN_ROLE_NAME)
  @PutMapping
  public Object pull(@RequestParam String imageTag) {
    final DockerClient dockerClient = clientFactory.get();
    return dockerClient.pullImageCmd(imageTag).exec(null);
  }

  @ApiOperation("推送镜像")
  @SaCheckPermission(value = "image:push",orRole = Role.ADMIN_ROLE_NAME)
  @PostMapping
  public Object push(@RequestBody PushImageRequest request) {
    final DockerClient dockerClient = clientFactory.get();
    return dockerClient.pushImageCmd(request.getImageId()).exec(null);
  }

  @ApiOperation("移除镜像")
  @SaCheckPermission(value = "image:delete",orRole = Role.ADMIN_ROLE_NAME)
  @DeleteMapping("/{imageId}")
  public ResponseModel<String> remove(@PathVariable String imageId,@RequestParam(defaultValue = "false") Boolean force) {
    imageService.remove(imageId, force);
    return ResponseModel.ok("OK");
  }

  @ApiOperation("清理镜像")
  @SaCheckPermission(value = "image:prune",orRole = Role.ADMIN_ROLE_NAME)
  @PostMapping("/prune")
  public ResponseModel<Boolean> purge() {
    imageService.pruneImage();
    return ResponseModel.ok(Boolean.TRUE);
  }

  /**
   * 更新镜像信息
   */
  @ApiOperation("标记镜像")
  @SaCheckPermission(value = "image:tag",orRole = Role.ADMIN_ROLE_NAME)
  @PostMapping("/update/tag")
  public ResponseModel<Boolean> updateImageInfo(@RequestBody ImageTagUpdateRequest req) {
    req.check();
    imageService.tag(req.getImageId(),req.getNewTag());
    return ResponseModel.ok(true);
  }

  /**
   * 保存镜像
   */
  @ApiOperation("导出镜像")
  @SaCheckPermission(value = "image:export",orRole = Role.ADMIN_ROLE_NAME)
  @GetMapping("/save/{nameTag}")
  public void save(@PathVariable String nameTag,HttpServletResponse response) {
    try (InputStream input = imageService.save(nameTag);
         ServletOutputStream output = response.getOutputStream()) {
      String currentTime = DateUtil.format(DateUtil.date(), "yyyyMMdd_HHmmss_");
      response.setContentType("application/x-zip-compressed;charset=UTF-8");
      response.setHeader("Content-Disposition","attachment;filename=" + currentTime + nameTag + ".zip");
      // 循环取出流中的数据
      byte[] b = new byte[1024];
      int len;
      while ((len = input.read(b)) > 0) {
        output.write(b, 0, len);
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
  /**
   * 批量保存镜像
   */
  @ApiOperation("批量导出镜像")
  @SaCheckPermission(value = "image:export",orRole = Role.ADMIN_ROLE_NAME)
  @PostMapping("/saveBatch")
  public void saveBatch(@RequestBody List<String> nameTagList, HttpServletRequest request,HttpServletResponse response) {
    imageService.saveBatch(nameTagList,request,response);
  }
}
