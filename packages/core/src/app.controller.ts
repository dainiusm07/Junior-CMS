import {
  Controller,
  Get,
  Param,
  Res,
  Post,
  Inject,
  CACHE_MANAGER,
  UseInterceptors,
  CacheInterceptor,
  Logger,
} from "@nestjs/common";
// import { InjectQueue } from '@nestjs/bull'
// import { Queue } from 'bull'

@Controller()
export class AppController {
  counter = 0;
  // constructor(
  // 	// @InjectQueue('app') private readonly appQueue: Queue,
  // 	@Inject(CACHE_MANAGER) private cacheManager
  // ) {}

  @Get("getHello")
  getHello() {
    return "Hello World!";
  }

  @Get(`static/:fileId`)
  getUpload(@Param("fileId") fileId, @Res() res): any {
    return res.sendFile(fileId, {
      root: "static",
    });
  }

  @Post("/gitlab")
  postGitlab(@Res() res): any {
    return res.body;
  }

  @Get("cache")
  @UseInterceptors(CacheInterceptor)
  incrementCounter() {
    this.counter++;
    return this.counter;
  }

  // @Get('nocache')
  // incrementCounterNoCache() {
  // 	this.counter++
  // 	return this.counter
  // }

  // // Call this endpoint to reset the cache for the route '/'
  // @Get('reset')
  // resetCache() {
  // 	const routeToClear = '/'
  // 	return this.cacheManager.del(routeToClear, () => Logger.log('clear done'))
  // }

  // @Get('transcode')
  // async transcode() {
  // 	await this.appQueue.add('transcode', {
  // 		file: 'audio.mp3'
  // 	})
  // }
}
