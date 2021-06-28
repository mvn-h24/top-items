import { Controller, Get, Header, Inject } from '@nestjs/common';
import { format, subDays } from 'date-fns';
import { Builder } from 'xml2js';

import { TopPageService } from '@top-page/top-page.service';
import { APP_DNS_NAME } from '@app/app.providers';

import { CATEGORY_URL } from './sitemap.constants';

@Controller('sitemap')
export class SitemapController {
  dateFormat = "yyyy-MM-dd'T'HH:mm:00.000xxx";
  xmlAttrs = {
    xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
  };

  constructor(
    private readonly topPageService: TopPageService,
    @Inject(APP_DNS_NAME) private readonly domainName: string,
  ) {}

  @Get('xml')
  @Header('content-type', 'text/xml')
  async sitemap() {
    const b = new Builder({
      xmldec: { version: '1.0', encoding: 'UTF-8' },
    });

    return b.buildObject({
      urlset: {
        $: this.xmlAttrs,
        url: await this.getUrlSetData(),
      },
    });
  }

  async getUrlSetData(): Promise<
    Array<{
      loc: string;
      lastmod: string;
      changefreq: string;
      priority: string;
    }>
  > {
    const r = [
      {
        loc: this.domainName,
        lastmod: format(subDays(new Date(), 1), this.dateFormat),
        changefreq: 'daily',
        priority: '1.0',
      },
      {
        loc: `${this.domainName}/courses`,
        lastmod: format(subDays(new Date(), 1), this.dateFormat),
        changefreq: 'daily',
        priority: '1.0',
      },
    ];
    return r.concat(
      (await this.topPageService.findAll()).map((page) => ({
        loc: `${this.domainName}${
          CATEGORY_URL[page.menu_category.firstLevel]
        }/${page.alias}`,
        lastmod: format(
          new Date(page.updatedAt ?? new Date()),
          this.dateFormat,
        ),
        changefreq: 'weekly',
        priority: '0.4',
      })),
    );
  }
}
