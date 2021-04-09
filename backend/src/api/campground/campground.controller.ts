import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/common/auth';
import { User } from 'src/common/decorators/user.decorator';
import { CampgroundService } from './campground.service';
import { CreateCampgroundDto } from './dto/create-campground.dto';
import { UpdateCampgroundDto } from './dto/update-campground.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/campgrounds')
export class CampgroundController {
  constructor(private readonly campgroundService: CampgroundService) {}

  @UseInterceptors(FilesInterceptor('images')) // the form field name
  @Post()
  createCamp(
    @User('id') author: string,
    // here the files should be an array. The official doc is wrong
    @UploadedFiles() imageFiles: Express.Multer.File[],
    @Body() createDto: CreateCampgroundDto,
  ) {
    return this.campgroundService.createCamp(author, createDto, imageFiles);
  }

  @Get()
  getCamps() {
    return this.campgroundService.getCamps();
  }

  @Get(':id')
  getCampById(@Param('id') id: string) {
    return this.campgroundService.getCampById(id);
  }

  @Get(':id/reviews')
  getCampReviews(@Param('id') id: string) {
    return this.campgroundService.getCampReviews(id);
  }

  @Patch(':id')
  updateCampById(
    @User('id') author: string,
    @Param('id') campId: string,
    @Body() updateDto: UpdateCampgroundDto,
  ) {
    return this.campgroundService.updateCampById(author, campId, updateDto);
  }

  @Delete(':id')
  removeCampById(@User('id') author: string, @Param('id') id: string) {
    return this.campgroundService.removeCampById(author, id);
  }
}
