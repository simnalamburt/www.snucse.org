import React from 'react';
import {connect} from 'react-redux';

import {UserLevel} from '../../../utils';
import {
  addTagToArticle,
  loadCandidateTags,
  initializeCandidateTags,
  deleteTagFromArticle
} from '../../../actions/dispatchers';
import TagBox from './TagBox';

const ArticleTagBox = React.createClass({
  propTypes: {
    articleId: React.PropTypes.number.isRequired
  },

  getTagFormId() {
    return `article-${this.props.articleId}`;
  },

  render() {
    return (
      <TagBox
        id={this.props.articleId}
        addable={UserLevel.tagAddable(this.props.userLevel)}
        addTag={this.props.addTagToArticle}
        candidates={this.props.candidates}
        loadCandidateTags={this.props.loadCandidateTags}
        initializeCandidateTags={this.props.initializeCandidateTags}
        getTagFormId={this.getTagFormId}
        userLevel={this.props.userLevel}
        deletable
        deleteTag={this.props.deleteTagFromArticle}
        tags={this.props.tags[this.props.articleId]}
        accessible={UserLevel.tagAccessible(this.props.userLevel)}
        />
    );
  }
});

const mapStateToProps = function (state) {
  return {
    userLevel: state.userInfo.userLevel,
    candidates: state.tag.candidate.byTagFormId,
    tags: state.tag.attached.articles
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    deleteTagFromArticle: (articleId, tagName) => deleteTagFromArticle(dispatch, articleId, tagName),
    addTagToArticle: (articleId, tagName) => addTagToArticle(dispatch, articleId, tagName),
    initializeCandidateTags: tagFormId => initializeCandidateTags(dispatch, tagFormId),
    loadCandidateTags: (tagFormId, query) => loadCandidateTags(dispatch, tagFormId, query)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleTagBox);
