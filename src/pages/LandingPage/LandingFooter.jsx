import { createStyles, Text, Container, ActionIcon, Group, rem, Image } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
//import { MantineLogo } from '@mantine/ds';
import Logo from '../../assets/Images/IMALogo.jpg';

const useStyles = createStyles((theme) => ({
  footer: {
    //marginTop: 50,
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
   // backgroundColor: '#E9ECEF',
   // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  logo: {
    maxWidth: rem(200),

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  description: {
    marginTop: rem(5),

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
      textAlign: 'center',
    },
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  groups: {
    display: 'flex',
    flexWrap: 'wrap',

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  wrapper: {
    width: rem(160),
  },

  link: {
    display: 'block',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: rem(3),
    paddingBottom: rem(3),

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: `calc(${theme.spacing.xs} / 2)`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  afterFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  social: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
    },
  },
}));

const data= [
  /*
    {
      "title": "About",
      "links": [
        {
          "label": "Features",
          "link": "#"
        },
        {
          "label": "Pricing",
          "link": "#"
        },
        {
          "label": "Support",
          "link": "#"
        },
        {
          "label": "Forums",
          "link": "#"
        }
      ]
    },
    */
    {
      "title": "Navigations",
      "links": [
        {
          "label": "About",
          "link": "/AboutUsPage"
        },
        {
          "label": "Services",
          "link": "/ServicesPage"
        },
        {
          "label": "Contact Us",
          "link": "/ContactUsPage"
        },
        {
          "label": "Releases",
          "link": "LandingPage"
        }
      ]
    },
    {
      "title": "Community",
      "links": [
        {
          "label": "Join Discord",
          "link": "LandingPage"
        },
        {
          "label": "Follow on Twitter",
          "link": "LandingPage"
        },
        {
          "label": "Email newsletter",
          "link": "LandingPage"
        },
        {
          "label": "GitHub discussions",
          "link": "LandingPage"
        }
      ]
    }
  ]

export default function LandingFooter() {
  const { classes } = useStyles();

  const handleLinkClick = (link) => {
    window.location.href = link; // Use window.location.href for navigation
  };

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text
      key={index}
      className={classes.link}
      onClick={() => handleLinkClick(link.link)}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
         {/*<MantineLogo size={30} />*/}
         {/*<Image width={150} height={55} size={30} fit="contain" src={Logo} />*/}
         {/*<Text fs={'italic'} fw={'bold'} ff={'cursive'} size={25}>IMA</Text>*/}
         <Text  fw={'bold'}  size={35} mt={5} >IMA</Text>
          <Text size="xs" color="dimmed" className={classes.description}>
          From social media marketing to email marketing, IMA is all in one marketing product – It provides a comprehensive solution for all your marketing needs..
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text color="dimmed" size="sm">
          © 2023 IMA.com. All rights reserved.
        </Text>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon size="lg">
            <IconBrandTwitter size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandYoutube size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandInstagram size="1.05rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}