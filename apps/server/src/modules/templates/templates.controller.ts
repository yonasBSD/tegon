import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Template } from '@tegonhq/types';
import { SessionContainer } from 'supertokens-node/recipe/session';

import { AuthGuard } from 'modules/auth/auth.guard';
import { Session as SessionDecorator } from 'modules/auth/session.decorator';

import {
  CreateTemplateInput,
  UpdateTemplateInput,
  TemplateRequestIdParams,
  RequestIdParams,
} from './templates.interface';
import TemplatesService from './templates.service';

@Controller({
  version: '1',
  path: 'templates',
})
export class TemplatesController {
  constructor(private templatesService: TemplatesService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createTemplate(
    @SessionDecorator() session: SessionContainer,
    @Body() templateData: CreateTemplateInput,
  ): Promise<Template> {
    const userId = session.getUserId();
    return await this.templatesService.createTemplate(userId, templateData);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllTemplates(
    @Query() requestParams: RequestIdParams,
  ): Promise<Template[]> {
    return await this.templatesService.getAllTemplates(requestParams);
  }

  @Get(':templateId')
  @UseGuards(AuthGuard)
  async getTemplate(
    @Param()
    templateId: TemplateRequestIdParams,
  ): Promise<Template> {
    return await this.templatesService.getTemplate(templateId);
  }

  @Post(':templateId')
  @UseGuards(AuthGuard)
  async updateTemplate(
    @Param()
    templateId: TemplateRequestIdParams,
    @Body() templateData: UpdateTemplateInput,
  ): Promise<Template> {
    return await this.templatesService.updateTemplate(templateId, templateData);
  }

  @Delete(':templateId')
  @UseGuards(AuthGuard)
  async deleteLabel(
    @Param()
    templateId: TemplateRequestIdParams,
  ): Promise<Template> {
    return await this.templatesService.deleteTemplate(templateId);
  }
}
