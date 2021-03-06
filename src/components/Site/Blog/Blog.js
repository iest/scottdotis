import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPosts} from 'actions/index';
import {Link} from 'react-router';
import moment from 'moment';

import Wrapper from 'components/Global/Wrapper/Wrapper';
import IconRow from 'components/Site/IconRow/IconRow';
import Loading from 'components/Site/Loading/Loading';

import s from './Blog.css';
import m from 'global/modifiers';

class Blog extends Component {

  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    const posts = this.props.posts;

    return(
      posts.map( (post) => {
        console.log(post);
        const rawDate = post.sys.createdAt;
        const dateObject = Date.parse(rawDate);
        const dateString = moment(rawDate).fromNow();
        return (
          <div className={s.post} key={post.sys.id}>
            <Link to={`/writing/about/${post.fields.slug}`} className={s.postLink}>
              <h3>{post.fields.title}</h3>
            </Link>
            <p className={s.meta}>{dateString}</p>
            { post.fields.blurb ?
                <p className={s.desc}>{post.fields.blurb}…</p>
              :
                null
            }
          </div>
        )
      })
    );

  }

  render() {
    const {posts} = this.props;
    return (
      <div className={s.root}>
        <Wrapper>
          <h1 className={[m.alpha, s.heading].join(' ')}>Blog</h1>
          <div className={s.thinRow}>
            <p className={s.subtext}>
              A patchwork collection of thoughts, ramblings and maybe even haikus of varying levels of coherence, relevance and self–indulgence. Who knows, you might actually find something useful on a design blog (you won't).
            </p>
            <IconRow />
          </div>
          { posts && posts.length > 0 ?
              <div className={s.posts}>
                <div className={s.thinRow}>
                  {this.renderPosts()}
                </div>
              </div>
            :
              <Loading />
          }
        </Wrapper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPosts: fetchPosts,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
