import { Controller, Get, Redirect, Req, Res, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('google')
export class AppController {
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  @Redirect()
  googleAuthRedirect(
    @Req() req,
    @Session() session: any,
    @Res({ passthrough: true }) res: any,
  ) {
    const username = `${req.user.firstName} ${req.user.lastName}`;

    return `${process.env.CLIENT_REDIRECT_URL}?username=${username}`;
  }
}
