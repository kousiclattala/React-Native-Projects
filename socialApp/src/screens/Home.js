import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';

import {Container, Form, H1} from 'native-base';

//redux stuff
import {connect} from 'react-redux';
import {getPosts} from '../actions/post';
import propTypes from 'prop-types';

import EmptyContainer from '../components/EmptyContainer';
import Post from '../components/Post';

const Home = ({getPosts, postsState, userDetails}) => {
  useEffect(() => {
    getPosts();
  }, []);

  if (postsState.loading) {
    return <EmptyContainer />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={postsState.posts}
        keyExtractor={item => item.id}
        renderItem={({item, index, separators}) => (
          <Post item={item} key={item.id} userDetails={userDetails} />
        )}
        ListEmptyComponent={() => (
          <Container style={styles.emptyContainer}>
            <H1>No Posts to show</H1>
          </Container>
        )}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  postsState: state.post,
  userDetails: state.auth.user,
});

const mapDispatchToProps = {
  getPosts,
};

Home.propTypes = {
  getPosts: propTypes.func.isRequired,
  postsState: propTypes.object.isRequired,
  userDetails: propTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    justifyContent: 'flex-start',
    padding: 4,
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#1b262c',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
