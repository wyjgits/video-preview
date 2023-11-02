# video-preview

> 一个基于Vue 3 + TypeScript + Vite + video.js + pinia的视频播放器

## 安装配置

1. 安装依赖

```bash
pnpm install
```

2. 启动项目

```bash
pnpm dev
```

3. 打包项目

```bash
pnpm build
```

## 1. 项目架构

> 项目主要分为播放器和控制器两部分，播放器和控制器的各个按钮互相解耦，只要保证为它们注入了PlayerKey进行关联，即可在任意位置按需组合使用它们。


- 视频播放器： 基于videojs播放视频，默认为hls格式
- 视频控制器： 自定义的控制器



