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
  @Redirect(process.env.REDIRECT_URL)
  googleAuthRedirect(
    @Req() req,
    @Session() session: any,
    @Res({ passthrough: true }) res: any,
  ) {
    if (req.user) {
      res.cookie(
        'username',
        `${req.user.firstName} ${req.user.lastName}`,
      );
    }
  }
}
